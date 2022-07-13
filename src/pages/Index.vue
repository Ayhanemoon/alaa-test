<template>
  <q-page class="login flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <Form @submitForm="login" :submitLabel="'login'">
          <template v-slot:inputs>
            <q-input
              v-model="mobile"
              label="Mobile"
              color="positive"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter your username',
              ]"
            />

            <q-input
              type="text"
              v-model="password"
              label="Password"
              color="positive"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter your password',
              ]"
            />
          </template>
        </Form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import Form from "components/Form";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: {
    Form,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const mobile = ref("");
    const password = ref("");
    const login = () => {
      store
        .dispatch("user/login", {
          mobile: mobile.value,
          password: password.value,
        })
        .then((response) => {
          $q.notify({
            color: "positive",
            textColor: "white",
            icon: "check_circle",
            message: "You are logged in",
            position: "top-right",
          });
          console.log(response);
          router.replace({ name: "profile" });
        })
        .catch((error) => {
          console.log(error);
          if (error.response !== undefined) {
            for (const property in error.response.data.errors) {
              $q.notify({
                color: "negative",
                textColor: "white",
                icon: "outlet",
                message: `${error.response.data.errors[property]}`,
                position: "top-right",
              });
            }
          }
        });
    };
    return {
      mobile,
      password,
      login,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 25rem;
  border-radius: 50px;
  background: transparent;
  padding: 30px 20px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

  @media (max-width: 768px) {
    width: 90%;
  }
}
</style>
