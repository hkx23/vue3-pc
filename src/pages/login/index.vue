<template>
  <div class="login-bg">
    <div class="logo"></div>

    <div class="login-wrapper">
      <cmp-row>
        <cmp-card :md="6" :xs="0" :ghost="true" class="login-main-image"></cmp-card>
        <cmp-card :md="6" :xs="12" :ghost="true">
          <t-space break-line size="5" class="toolbar">
            <span>下载二维码</span>
            <t-divider layout="vertical" />
            <t-dropdown trigger="click">
              <div class="lang-btn">{{ langName }}<t-icon name="chevron-down" size="14" /></div>
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
          <!-- <div class="auth-message">
            <error-circle-filled-icon class="icon" />
            <span class="title">授权到期时间</span>
            2024-09-12
          </div> -->
        </cmp-card>
      </cmp-row>
    </div>

    <footer class="copyright">Copyright @ 2021-2023. All Rights Reserved</footer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
// import { ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { DropdownOption } from 'tdesign-vue-next';
import { ref } from 'vue';

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

<style lang="less" scoped>
.login-bg {
  height: 100vh;
  position: relative;
  background-color: white;

  .logo {
    position: absolute;
    top: 30px;
    left: 50px;
    width: 84px;
    height: 28px;
    background-image: url('@/assets/images/login-logo.png');
    background-size: cover;
    background-position: 100%;
  }

  .login-wrapper {
    margin: 0 auto;
    width: 1010px;
    height: 638px;
    background-color: white;
    z-index: 100;
    position: relative;
    top: calc(50% - 316px);
    border-radius: 8px;
    box-shadow: 0 0 20px rgb(107 107 107 / 24%);
    overflow: hidden;

    .login-main-image {
      background-image: url('@/assets/images/login-bg.png');
      background-size: cover;
      background-position: 100%;
    }

    .toolbar {
      position: absolute;
      right: 24px;
      top: 16px;
      font-size: 12px;

      .lang-btn {
        cursor: pointer;

        .t-icon {
          position: relative;
          top: -1px;
          left: 3px;
          line-height: 16px;
        }
      }
    }

    .title-container {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .login-container {
      width: 270px;
      margin: 0 auto;
      position: relative;
      top: calc(50% - 130px);
    }

    .auth-message {
      height: 20px;
      padding-top: 2px;
      padding-bottom: 2px;
      border-radius: 4px;
      position: absolute;
      bottom: 16px;
      width: 270px;
      left: calc(50% - 135px);
      background-color: #ffe5e5;
      line-height: 16px;
      font-size: 12px;
      color: rgb(69 69 69 / 70%);

      .icon {
        color: #f00;
        margin-left: 18px;
        margin-right: 5px;
        position: relative;
        top: -1px;
      }

      .title {
        font-weight: 700;
        color: #454545;
        margin-right: 2px;
      }
    }
  }

  .copyright {
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 28px;
    font-size: 12px;
  }
}
</style>
