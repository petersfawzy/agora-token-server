const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const port = 3000;

// ضع بيانات مشروعك هنا
const APP_ID = 'd20514456ca54182897c778167574d6a';
const APP_CERTIFICATE = '8e61c3648d0746bd9d034a2c9cb5c05f';

app.get('/rtcToken', (req, res) => {
  const channelName = req.query.channelName;
  const uid = parseInt(req.query.uid) || 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600; // ثانية (ساعة)

  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTs = currentTimestamp + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTs
  );

  return res.json({ token });
});

app.listen(port, () => {
  console.log(`Token server running at http://localhost:${port}`);
});