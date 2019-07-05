<template>
  <div id="main">
    <br>
    <button class="btn" @click="showLocalNotifications">Notifications</button>
    <br>
    <button class="btn" @click="showtoast">Toast</button>
    <br>
    <button class="btn" @click="showShare">showShare</button>
    <br>
  </div>
</template>

<script>
import { Plugins } from "@capacitor/core";
import { CameraResultType } from "@capacitor/core";
import { setTimeout } from "timers";

const { Keyboard } = Plugins;
const { LocalNotifications } = Plugins;
const { Share } = Plugins;
const { Device } = Plugins;
const { Geolocation } = Plugins;
const { Toast } = Plugins;

export default {
  name: "Android",
  data() {
    return {
      tt: "",
      deviceInformation: null,
      deviceModel: null,
      devicePlatform: null,
      //notifications
      notificationsTitle: "Capacitor demo",
      notificationsBody: "Capacitor推播"
    };
  },
  methods: {
    // showKeyboard() {
    //   Keyboard.show()
    //     .then(() => {
    //       console.log("Keyboard shown");
    //     })
    //     .catch(e => {
    //       console.error("Keyboard plugin:", e);
    //     });
    // },

    showLocalNotifications() {
      if (this.devicePlatform == "web") {
        let body = this.notificationsBody;
        function displayNotification() {
          let t = setTimeout(function() {
            new Notification(body);
          }, 1000);
        }
        function askForNotificationPermission() {
          Notification.requestPermission(function(status) {
            console.log("User Choice", status);
            if (status !== "granted") {
              console.log("用戶拒絕推播！");
            } else {
              displayNotification();
            }
          });
        }
        askForNotificationPermission();
      } else {
        LocalNotifications.schedule({
          notifications: [
            {
              title: this.notificationsTitle,
              body: this.notificationsBody,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 1) },
              sound: null,
              attachments: null,
              actionTypeId: "",
              extra: null
            }
          ]
        });
      }
    },
    async showShare() {
      let shareRet = await Share.share({
        title: "See cool stuff",
        text: "Really awesome thing you need to see right meow",
        url: "http://ionicframework.com/",
        dialogTitle: "Share with buddies"
      });
    },
    async showtoast() {
      await Toast.show({
        text: "Hello Capacitor!"
      });
    },
    async deviceIfo() {
      this.deviceInformation = await Device.getInfo();
      if (this.deviceInformation.platform == "electron") {
        //透過UUID偵測electron平台
        this.devicePlatform = "Electron";
      } else {
        this.devicePlatform = this.deviceInformation.platform;
      }
      this.deviceModel = this.deviceInformation.model;
      console.log(this.deviceInformation);
    }
  },
  mounted() {
    this.deviceIfo();
  }
};
</script>

<style>
#main {
  padding-left: 15px;
}
.btn {
  border: 0;
  background-color: #fff;
  color: #555555;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
  height: 50px;
  font-size: 1.25rem;
  white-space: nowrap;
  margin: 2px;
}
.btn:hover {
  background-color: #c8c8c8;
}
</style>

