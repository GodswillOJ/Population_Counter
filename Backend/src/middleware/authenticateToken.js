export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Received token:', token);

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_Phrase, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  });
};
