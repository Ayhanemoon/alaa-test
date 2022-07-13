<template>
  <q-page class="profile flex flex-center">
    <q-card class="profile-card">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        <Form @submitForm="saveProfile" :submitLabel="'save'">
          <template v-slot:inputs>
            <q-input
              v-model="profile.first_name"
              label="First Name"
              color="positive"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter your name',
              ]"
            />
            <q-input
              v-model="profile.last_name"
              label="Last Name"
              color="positive"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter your email',
              ]"
            />
            <q-input
              v-model="profile.address"
              label="Address"
              color="positive"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter your mobile',
              ]"
            />
            <q-input
              v-model="profile.school"
              label="School"
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

      <q-separator dark />

      <q-card-actions>
        <q-btn color="negative" @click="logout" style="width: 100%"
          >Logout</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Form from "components/Form";

export default defineComponent({
  name: "Profile",
  components: {
    Form,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters["user/user"]);
    const profile = ref({
      first_name: user.value.user.first_name,
      last_name: user.value.user.last_name,
      address: user.value.user.address,
      school: user.value.user.school,
    });
    const logout = () => {
      store.dispatch("user/logout").then((response) => {
        router.replace({ name: "login" });
      });
    };

    onBeforeMount(() => {
      store.dispatch("user/get");
    });
    return {
      user,
      profile,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-card {
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
