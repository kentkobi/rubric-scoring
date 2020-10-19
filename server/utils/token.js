require('dotenv').config()
const jwt = require('jsonwebtoken')
const pemCert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJB/vH9z4UoaWFMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi00cnlhd3d3aC5hdS5hdXRoMC5jb20wHhcNMjAxMDE3MDAyOTI0WhcN
MzQwNjI2MDAyOTI0WjAkMSIwIAYDVQQDExlkZXYtNHJ5YXd3d2guYXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnma0biOMlyfePsWH
K6quGRSu8zZidWsnLtDXTWvJINXVyxhIuG1AFC9YJ7B7cVyFC/x5EksiYruLvIIy
u+NstM/ox1D0d2ElQRpmbtR6/sec/yRhFZeThzGJcCeILk0KgsXg1reqNTG7bHF+
ISFCFb8SoivC5Pxb3prRz2LEqd1Kq0wr39Qnc0ieIOdSfdLu4kVa6w4AfHa012Ag
WX38jBVKYbwrODzqa+aSDQfYTfam9CfofLl5QFtWrWcCH0WiUzUrUl36IiMdshKQ
Hc6jVU4Oa0Aq3/+M/Tf0DCoCaL3riiUk/O8gZfJ72nsvUYT83Elw0X2dIVhIlZrU
IiSO/QIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBR/FNkyLr8u
G6hW2wak6YgLinebbTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
ADqD9b4JsLt5wXRl26x5QG8783p5SeVKX4eIPSz2cbVzA3LnZV2afntkX6zBbkkx
YYPast032crCApUvC0yywm95Ipmdhl4bDLTMpkV0ujO41l7uQtrV5D5b+5Egyo/T
fqBSRGoyZKWmxxRuPGpmJAX4LzYLTRxJguZFmXmr/JKQ39RbLhWRMsUo78f5Z2kM
xnebdbtbNl97duKTJtPrHYGTS6zoVLz93s/jFm8aOFB75qJ27FwrMOncLQ1XeJWx
Ca79lr0GfTFSSUSalpFeWFiCXO6tmOMWVLjemdIz2osf04XMhtU0rYFlkh6s6FOV
Q+3cmSJ1N+/l7S/6n0etGAU=
-----END CERTIFICATE-----`

const getTokenFrom = request => {
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
    return authorization.substring(7)  
  }  
  return null
}

const validateToken = (req) => {
  const token = getTokenFrom(req)

  // if no token then we fail
  if (!token) {
    return null
  }

  const decodedToken = jwt.verify(token, pemCert, { algorithm: 'RS256' })
   
  if (!decodedToken.id) {
    return null
  } else {
    return decodedToken
  }
}

module.exports = {getTokenFrom, validateToken}