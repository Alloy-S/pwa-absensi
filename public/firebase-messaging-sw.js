importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAcApaSx_wNPfywQUQpjQcu5rSzqd_SYB8",
  authDomain: "benz-absensi.firebaseapp.com",
  projectId: "benz-absensi",
  storageBucket: "benz-absensi.firebasestorage.app",
  messagingSenderId: "78575305805",
  appId: "1:78575305805:web:8e3ee053858f24795a0804",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  if (payload.data && payload.data.action === "FORCE_LOGOUT") {
    console.log(
      "[firebase-messaging-sw.js] Menerima sinyal logout paksa. Mengirim pesan ke client..."
    );

    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clients) => {
        if (clients && clients.length) {
          clients.forEach((client) => {
            client.postMessage({
              action: "FORCE_LOGOUT",
              message:
                payload.data.message ||
                "Anda telah logout karena login di perangkat lain.",
            });
          });
        }
      });
  } else if (payload.notification) {
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
