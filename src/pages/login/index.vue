<template>
  <cmp-row align="middle" justify="space-around" class="login-bg">
    <div class="login-wrapper">
      <div class="logo"></div>
      <cmp-row>
        <cmp-card :md="6" :xs="0" :ghost="true" class="login-main-image">
          <div class="slogan">{{ $t('pages.login.slogan') }}</div>
        </cmp-card>
        <cmp-card :md="6" :xs="12" :ghost="true">
          <t-space break-line size="5" class="toolbar">
            <!-- <span>下载二维码</span>
            <t-divider layout="vertical" /> -->
            <t-dropdown trigger="click">
              <div class="lang-btn">
                <internet-icon class="internet-icon"></internet-icon>
                {{ langName }}<t-icon name="chevron-down" size="14" />
              </div>
              <t-dropdown-menu>
                <t-dropdown-item
                  v-for="(lang, index) in langList"
                  :key="index"
                  :value="lang.value"
                  @click="changeLang(lang)"
                  >{{ lang.content }}</t-dropdown-item
                ></t-dropdown-menu
              >
            </t-dropdown>
          </t-space>
          <div class="login-container">
            <div class="title-container">
              {{ $t('pages.login.loginTitle') }}
            </div>

            <login v-if="type === 'login'" />
            <register v-else @register-success="switchType('login')" />
            <tdesign-setting />
          </div>
        </cmp-card>
      </cmp-row>
      <div v-if="false" class="auth-message">
        <error-circle-filled-icon class="icon" />
        <span class="title">警告！授权即将到期！ </span>
        到期截止时间至 2024-09-12，超过该时间系统将不可用，请尽快联系系统管理员进行处理。
      </div>
    </div>

    <footer class="copyright">
      Copyright ©2023-2024 BumbleBee Team All rights reserved. <span class="download-btn">下载软件</span>
    </footer>
  </cmp-row>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import { ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { DropdownOption } from 'tdesign-vue-next';
import { ref } from 'vue';

import InternetIcon from '@/assets/assets-login-internet.svg?component';
import TdesignSetting from '@/layouts/setting.vue';
import { langList, langName } from '@/locales/index';
import { useLocale } from '@/locales/useLocale';

import Login from './components/Login.vue';
import Register from './components/Register.vue';

// 切换语言
const { changeLocale } = useLocale();
const changeLang = (lang: DropdownOption) => {
  changeLocale(lang.value as string);
};

const type = ref('login');
const switchType = (val: string) => {
  type.value = val;
};
</script>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
#app {
  overflow: hidden;
}

// .t-dropdown__item-text {
//   color: #454545;
//   font-size: 12px;
// }
</style>
<style lang="less" scoped>
.login-bg {
  height: 100vh;
  position: relative;
  background-color: #ccd0db;

  .logo {
    position: absolute;
    top: 36px;
    left: 36px;
    width: 84px;
    height: 28px;
    background-image: url('@/assets/images/login-logo.png');
    background-size: cover;
    background-position: 100%;
    z-index: 999;
  }

  .login-wrapper {
    margin: 0 auto;
    width: calc(0.7 * 100vw);
    max-width: 1020px;
    min-width: 400px;
    height: calc(0.7 * 100vh);
    max-height: 640px;
    background-color: white;
    z-index: 100;
    position: relative;
    // top: calc(50% + (calc(0.7 * 100vh) * 50%));
    border-radius: 8px;
    box-shadow: 0 0 20px rgb(107 107 107 / 24%);
    overflow: hidden;

    .login-main-image {
      background-image: url('/images/login-bg.png');
      background-size: cover;
      background-position: 100%;
      position: relative;

      .slogan {
        margin: 0 auto;
        position: relative;
        top: 120px;
        font-weight: 700;
        font-size: 28px;
        letter-spacing: 1px;
      }
    }

    .toolbar {
      font-size: 12px;
      width: 360px;
      margin: 0 auto;

      .lang-btn {
        cursor: pointer;
        position: relative;
        color: #888e9e;
        top: 38px;
        float: right;

        .t-icon {
          position: relative;
          top: -1px;
          left: 3px;
          line-height: 16px;
        }

        .internet-icon {
          position: relative;
          top: 4px;
          margin-right: 3px;
        }
      }
    }

    .title-container {
      font-size: 24px;
      margin-bottom: 36px;
      color: #454545;
    }

    .login-container {
      width: 360px;
      margin: 0 auto;
      position: relative;
      top: calc(50% - 180px);
    }

    .auth-message {
      height: 48px;
      line-height: 42px;
      padding-top: 2px;
      padding-bottom: 2px;
      border-radius: 0 0 4px 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      // left: calc(50% - 135px);
      background-color: #ff5733;
      // line-height: 16px;
      font-size: 12px;
      color: #fff;

      .icon {
        margin-left: 32px;
        margin-right: 5px;
        position: relative;
        top: -1px;
        font-size: 14px;
      }

      .title {
        font-weight: 700;
        margin-right: 2px;
        font-size: 14px;
      }
    }
  }

  .copyright {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 28px;
    font-size: 12px;
    color: #454545;
  }

  .download-btn {
    margin-left: 8px;
    text-decoration: underline;
    cursor: pointer;
    color: #454545;
  }
}
</style>
