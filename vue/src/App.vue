<template>
  <div id="app">
    <div id="main">
      <div id="top">
        <h1>Capacitor Demo</h1>
        <h4>當前使用的系統：{{deviceModel}}</h4>
        <h4>當前使用的平台：{{devicePlatform}}</h4>
      </div>
      <div id="nav-bar">
        <router-link to="/">
          <div id="home" class="nav-bar-item" @click="closeNavBar">Home</div>
        </router-link>
        <router-link to="/Android">
          <div id="android" class="nav-bar-item" @click="closeNavBar">其他API</div>
        </router-link>
      </div>
      <div id="hamburger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <router-view/>

      <div id="footer">
        <p>南台科技大學 資訊管理所 蔡宗叡2.0</p>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/components/Home";
import Android from "@/components/Android";

import { Plugins } from "@capacitor/core";
import { CameraResultType } from "@capacitor/core";
import { FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

const { Camera } = Plugins;
const { Filesystem } = Plugins;
const { Device } = Plugins;
const { Geolocation } = Plugins;

const { Keyboard } = Plugins;
const { LocalNotifications } = Plugins;
const { Share } = Plugins;

export default {
  name: "App",
  components: {
    Android,
    Home
  },
  data() {
    return {
      electronUUID: "e6fc98a3-deb2-45d6-a2a6-e3c88f64394f",
      imgSrc: null,
      image: null,
      //for device information
      deviceInformation: null,
      deviceModel: null,
      devicePlatform: null
    };
  },
  methods: {
    async deviceIfo() {
      this.deviceInformation = await Device.getInfo();
      this.devicePlatform = this.deviceInformation.platform
      this.deviceModel = this.deviceInformation.model;
      console.log(this.deviceInformation);
    },
    navBar() {
      let hamburger = document.querySelector("#hamburger");
      let navBar = document.querySelector("#nav-bar");
      let navBarItem = document.querySelectorAll(".nav-bar-item");
      hamburger.addEventListener("click", () => {
        
           navBar.classList.toggle("open");
          navBarItem[0].classList.toggle("open");
       
      });      
    },
    closeNavBar(){
      let screenWidth = document.documentElement.clientWidth
      let navBar = document.querySelector("#nav-bar");
      if(screenWidth <= 750){        
        navBar.classList.toggle("open");
      }          
    }
  },
  mounted() {
    this.deviceIfo();
    this.navBar();
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff;
  text-decoration: none;
}
/* img {
  max-width: 100%;
} */
#main {
  color: #fff;
  padding: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  display: flex;
  flex-direction: column;
}
#top {
  max-width: 100%;
  font-weight: normal;
  background-color: #cf9a97;
}
.line {
  width: 30px;
  height: 3px;
  background-color: #797979;
  margin: 3px;
}
#hamburger {
  position: fixed;
  cursor: pointer;
  right: 6%;
  top: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  border-radius: 100%;
}

#footer {
  padding: 1.2em;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
@media only screen and (min-width: 750px) {
  /*web part*/
  #main {
    padding: 0px;
  }
  #top {
    display: flex;
    padding: 15px 0px 5px 15px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #555555;
  }
  #top h1,
  h4 {
    margin-block-start: 0;
  }
  #nav-bar {
    display: flex;
    flex-direction: row;
    background-color: #cf9a97;
    padding: 10px 0px 10px 10px;
    font-size: 18px;
  }
  .nav-bar-item {
    margin: 8px 10px 8px 10px;
  }
  #hamburger {
    display: none;
  }
}

@media only screen and (max-width: 750px) {
  /*mobile part*/
  #nav-bar {
    position: fixed;
    top: 20%;
    right: 10%;
    transform: translate(25%);
    height: 0;
    width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 30px;
    transition: ease-out  0.5s ;
  } 
  #nav-bar.open {
    height: 30vh;
    width: 25vw;
  }
  .nav-bar-item {
    display: none;
  }
  #nav-bar.open .nav-bar-item {
    display: flex;
    margin: 10px;
  }
 
  
}
</style>
