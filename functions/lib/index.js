"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const axios_1 = require("axios");
const whitelist = ['http://localhost:8080', 'http://umarov.github.io', 'https://umarov.github.io'];
const cors = require('cors')({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.sendNotification = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const { timerAmount, notificationToken } = request.body;
        try {
            yield makeNotificationRequest(timerAmount, notificationToken);
            response.send('Success');
        }
        catch (err) {
            console.error(err);
            response.status(400).send('Failed');
        }
    }));
}));
function makeNotificationRequest(timerAmount, notificationToken) {
    const notificationPayload = {
        body: 'Timer is up!',
        icon: 'static/images/timer.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        data: {
            timerAmount,
        },
        tag: 'request',
        actions: [{ action: 'yes', title: 'Restart Timer', icon: 'static/images/check.png' }],
        priority: 'high',
    };
    return axios_1.default.post('https://fcm.googleapis.com/fcm/send', {
        to: notificationToken,
        message: notificationPayload,
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `key=${functions.config().gcmpushnotification.key}`,
        }
    });
}
//# sourceMappingURL=index.js.map