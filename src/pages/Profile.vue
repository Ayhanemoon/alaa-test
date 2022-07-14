<template>
  <q-page class="profile flex flex-center">
    <q-card class="profile-card">
      <q-card-section>
        <div class="text-h6">Profile</div>
        <div class="text-subtitle2">You can update your profile here</div>
      </q-card-section>

      <q-card-section>
        <Form @submitForm="saveProfile" :submitLabel="'save'">
          <template v-slot:inputs>
            <div class="row flex justify-center items-start q-gutter-sm">
              <div class="col-12 col-lg-5">
                <q-input
                  v-model="profile.first_name"
                  label="First Name"
                  color="positive"
                  lazy-rules
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please enter your name',
                  ]"
                />
                <q-input
                  v-model="profile.last_name"
                  label="Last Name"
                  color="positive"
                  lazy-rules
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please enter your email',
                  ]"
                />
                <q-input
                  v-model="profile.address"
                  label="Address"
                  color="positive"
                  lazy-rules
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please enter your mobile',
                  ]"
                />
                <q-input
                  v-model="profile.school"
                  label="School"
                  color="positive"
                  lazy-rules
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Please enter your password',
                  ]"
                />
              </div>
              <div class="col-12 col-lg-5">
                <q-select
                  v-model="profile.major"
                  outlined
                  color="positive"
                  :options="majors"
                  :option-value="(option) => option.id"
                  :option-label="(option) => option.title"
                  label="Major"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <q-select
                  v-model="profile.grade"
                  outlined
                  color="positive"
                  :options="grades"
                  :option-value="(option) => option.id"
                  :option-label="(option) => option.title"
                  label="Grade"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <q-select
                  v-model="profile.gender"
                  outlined
                  color="positive"
                  :options="genders"
                  :option-value="(option) => option.id"
                  :option-label="(option) => option.title"
                  label="Gender"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <q-select
                  v-model="province"
                  outlined
                  color="positive"
                  :options="provinces"
                  :option-value="(option) => option.id"
                  :option-label="(option) => option.title"
                  label="province"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <q-select
                  v-model="profile.city"
                  outlined
                  color="positive"
                  :options="
                    cities.filter((city) => city.province.id === province.id)
                  "
                  :option-value="(option) => option.id"
                  :option-label="(option) => option.title"
                  label="City"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
            </div>
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
import { useQuasar } from "quasar";
import Form from "components/Form";

export default defineComponent({
  name: "Profile",
  components: {
    Form,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters["user/user"]);
    const profile = ref({
      first_name: user.value.user.first_name,
      last_name: user.value.user.last_name,
      address: user.value.user.address,
      school: user.value.user.school,
      major: user.value.user.major,
      grade: user.value.user.grade,
      city: user.value.user.shahr,
      gender: user.value.user.gender,
    });
    const province = ref("");

    const genders = computed(() => store.getters["profile/genders"]);
    const majors = computed(() => store.getters["profile/majors"]);
    const cities = computed(() => store.getters["profile/cities"]);
    const provinces = computed(() => store.getters["profile/provinces"]);
    const grades = computed(() => store.getters["profile/grades"]);

    const logout = () => {
      store.dispatch("user/logout").then((response) => {
        router.replace({ name: "login" });
      });
    };

    const saveProfile = () => {
      let formData = {
        first_name: profile.value.first_name,
        last_name: profile.value.last_name,
        address: profile.value.address,
        school: profile.value.school,
        major_id: profile.value.major.id,
        grade_id: profile.value.grade.id,
        gender_id: profile.value.gender.id,
        shahr_id: profile.value.city.id,
      };
      let data = {
        profile: formData,
        userId: user.value.user.id,
      };
      store
        .dispatch("profile/update", data)
        .then(() => {
          $q.notify({
            color: "positive",
            textColor: "white",
            icon: "check_circle",
            message: "Your profile updated successfully",
            position: "top-right",
          });
        })
        .catch((error) => {
          $q.notify({
            color: "negative",
            textColor: "white",
            icon: "outlet",
            message: `Something went wrong, Please try again later`,
            position: "top-right",
          });
        });
    };

    onBeforeMount(() => {
      store.dispatch("user/get").then(() => {
        profile.value = {
          first_name: user.value.user.first_name,
          last_name: user.value.user.last_name,
          address: user.value.user.address,
          school: user.value.user.school,
          major: user.value.user.major,
          grade: user.value.user.grade,
          city: user.value.user.shahr,
          gender: user.value.user.gender,
        };
      });
      store.dispatch("profile/getOptions");
    });
    return {
      user,
      profile,
      province,
      genders,
      majors,
      cities,
      provinces,
      grades,
      logout,
      saveProfile,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile-card {
  width: 50rem;
  border-radius: 50px;
  background: transparent;
  padding: 30px 20px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

  @media (max-width: 768px) {
    width: 90%;
  }
}
</style>
