function getTokenFromHeader(headers){
  const authHeader = headers['authorization'] || headers ['Authorization'] || '';

if (typeof authHeader !== 'string') return null;

  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }

  return null;
}


module.exports = getTokenFromHeader;