<template>

  <h1 class="flex justify-content-center">Welcome to Parse Client Demo PWA</h1>
  <h2 v-if="isSignUp" class="flex justify-content-center">Sign up</h2>
  <h2 v-else class="flex justify-content-center">Login</h2>


  <div class="flex align-content-center justify-content-center">
    <Message class="w-7" v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 flex justify-content-center">
      <InputText class="password-field-width" :class="{ 'p-invalid': v$.username.$error }" v-model="username" placeholder="Username" />
    </div>
    <div class="field col-12 flex justify-content-center">
      <Password v-model="password" :class="{ 'p-invalid': v$.password.$error }" placeholder="Password" :feedback="false" toggleMask />
    </div>

    <template v-if="isSignUp">
      <div class="field col-12 flex justify-content-center">
        <InputText class="password-field-width" :class="{ 'p-invalid': v$.eMail.$error }" v-model="eMail" placeholder="E-mail" />
      </div>
      <div class="field col-12 flex justify-content-center">
        <Button label="Sign up" @click="signUp()"></Button>
      </div>
      <div class="field col-12 flex justify-content-center">
        <Button label="Login" class="p-button-text p-button-secondary" @click="signUpForm(false)"></Button>
      </div>
    </template>
    <template v-else>
      <div class="field col-12 flex justify-content-center">
        <Button label="Login" @click="login()"></Button>
      </div>
      <div class="field col-12 flex justify-content-center">
        <Button label="Sign Up" class="p-button-text p-button-secondary" @click="signUpForm(true)"></Button>
      </div>
    </template>
  </div>

</template>

<script>
import Parse from 'parse/dist/parse.min.js';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
  emits: ['loggedInUser'],
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      username: null,
      password: null,
      eMail: null,
      user: null,
      isSignUp: false,
      messages: []
    }
  },
  validations() {
    const loginRules = {
      username: { required },
      password: { required },
    }
    if (this.isSignUp) {
      loginRules.eMail = { email, required}; // disable for server side validation show case with server error
    }
    return loginRules;
  },
  methods: {
    async login() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid) {
        try {
          this.user = await Parse.User.logIn(this.username, this.password, { usePost: true });
          this.$emit('loggedInUser', this.user);
        } catch (error) {
          this.messages.push({ severity: 'error', content: `Error: ${error.code} - ${error.message}` });
        }
      }
    },
    async signUp() {
      const isFormValid = await this.v$.$validate();
      if (isFormValid) {
        const user = new Parse.User();
        user.set("username", this.username);
        user.set("password", this.password);
        user.set("email", this.eMail);
        user.set("websocket", true);
        try {
          await user.signUp();
          this.user = Parse.User.current();
          this.$emit('loggedInUser', this.user);
        } catch (error) {
          this.messages.push({ severity: 'error', content: `Error: ${error.code} - ${error.message}` });
        }
      }
    },
    signUpForm(isSignUpForm) {
      this.isSignUp = isSignUpForm;
    }
  }
}
</script>

<style scoped lang="scss">
@import 'primeflex/primeflex.scss';

.password-field-width {
  width: 223px;
}
</style>