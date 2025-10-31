const bcrypt = require('bcryptjs');
const pwd = '{bcryptjs|NNk]lc[{Te!{q9i6RU+;CU=sQOAd.}d=<VfirY{i*z*=wZX8MYTm]A,^l?=<JM1tO>)n.eBg';
const hash = bcrypt.hashSync(pwd, 12);
console.log(hash);
