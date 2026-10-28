import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 52px;
  padding: 0.9rem 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  background: var(--paper);
  color: var(--ink);
  font-size: 1rem;
  font-family: inherit;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &[data-placeholder='true'] span {
    color: #8d897f;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.3s var(--ease-out);
  }

  &[aria-expanded='true'] svg {
    transform: rotate(180deg);
  }

  &:focus-visible,
  &[aria-expanded='true'] {
    outline: none;
    background: #fff;
    border-color: var(--ink);
    box-shadow: 0 0 0 4px rgba(212, 255, 63, 0.65);
  }
`;

const List = styled(motion.ul)`
  position: absolute;
  z-index: 30;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(15, 15, 13, 0.12);
  box-shadow: 0 24px 60px -20px rgba(15, 15, 13, 0.45);
  transform-origin: top center;
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  border-radius: 9px;
  color: var(--ink);
  font-size: 0.95rem;
  line-height: 1.35;
  cursor: pointer;

  &[data-active='true'] {
    background: var(--paper);
  }

  &[aria-selected='true'] {
    background: var(--lime);
    font-weight: 600;
  }
`;

/**
 * Liste déroulante accessible (motif « listbox ») : clavier (flèches, Entrée, Échap, Tab),
 * clic extérieur pour fermer. `options` : [{ value, label }], sans l’option vide.
 */
export default function Dropdown({ id, labelId, value, onChange, options, placeholder = 'Choisir une option' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const listId = `${id}-listbox`;
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };

  const choose = (i) => {
    onChange(options[i].value);
    setOpen(false);
    document.getElementById(id)?.focus();
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      setActive(e.key === 'Home' ? 0 : options.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (active >= 0) choose(active);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <Wrap ref={wrapRef}>
      <Trigger
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        data-placeholder={!selected}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <FiChevronDown aria-hidden size={18} />
      </Trigger>
      <AnimatePresence>
        {open ? (
          <List
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((o, i) => (
              <Option
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={o.value === value}
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
              >
                {o.label}
                {o.value === value ? <FiCheck aria-hidden size={16} /> : null}
              </Option>
            ))}
          </List>
        ) : null}
      </AnimatePresence>
    </Wrap>
  );
}
