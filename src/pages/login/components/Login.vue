<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="account">
        <div class="form-label">
          <username-icon class="icon"></username-icon>
          {{ `${$t('pages.login.input.account')}` }}
        </div>
        <t-input v-model="formData.account" autofocus :placeholder="`${$t('pages.login.input.accountPlaceholder')}`">
          <!-- <template #prefix-icon>
            <t-icon name="user" />
          </template> -->
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <div class="form-label">
          <password-icon class="icon"></password-icon>
          {{ `${$t('pages.login.input.password')}` }}
        </div>
        <t-input
          v-model="formData.password"
          :type="showPsw ? 'text' : 'password'"
          clearable
          :placeholder="`${$t('pages.login.input.passwordPlaceholder')}`"
        >
          <!-- <template #prefix-icon>
            <t-icon name="lock-on" />
          </template> -->
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <!-- <t-checkbox>{{ $t('pages.login.remember') }}</t-checkbox> -->
        <!-- <span class="tip">{{ $t('pages.login.forget') }}</span> -->
      </div>
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block type="submit"> {{ $t('pages.login.signIn') }} </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import PasswordIcon from '@/assets/assets-login-password.svg?component';
import UsernameIcon from '@/assets/assets-login-username.svg?component';
import { t } from '@/locales';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const INITIAL_DATA = {
  phone: '',
  account: '',
  password: '',
  verifyCode: '',
  checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  phone: [{ required: true, message: t('pages.login.required.phone'), type: 'error' }],
  account: [{ required: true, message: t('pages.login.required.account'), type: 'error' }],
  password: [{ required: true, message: t('pages.login.required.password'), type: 'error' }],
  verifyCode: [{ required: true, message: t('pages.login.required.verification'), type: 'error' }],
};

const type = ref('password');

const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);

const router = useRouter();
const route = useRoute();

const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    await userStore.login(formData.value);

    MessagePlugin.success('登录成功');
    const redirect = route.query.redirect as string;
    const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';
    router.push(redirectUrl);
  }
};
</script>

<style lang="less" scoped>
// @import '../index.less';
.item-container {
  :deep(.t-input) {
    height: 42px;
    border-color: transparent;
    background-color: #f7f7f7;
    padding: 0 12px;

    &.t-input--focused {
      border-color: var(--td-brand-color);
    }

    input {
      background-color: transparent !important;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  :deep(.t-form__controls) {
    &.t-is-error {
      svg {
        color: var(--td-text-color-placeholder);
      }
    }

    .t-form__controls-content {
      flex-flow: column;
    }
  }

  .form-label {
    display: block;
    width: 100%;
    color: #888e9e;
    font-size: 13px;
    margin-bottom: 8px;
    position: relative;

    .icon {
      position: relative;
      top: 2px;
      margin-right: 5px;
    }
  }
}

.btn-container {
  margin-top: 24px !important;

  :deep(.t-button) {
    height: 42px;
  }
}
</style>
