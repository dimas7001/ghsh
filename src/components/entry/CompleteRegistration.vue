<template>
  <RegistrationBlock>
    <div class="registration">
      <form
        class="registration__form"
      >
        <input
          class="registration__field"
          placeholder="Your name please"
          type="text"
          v-model="registrationData.name"
        >
        <input
          class="registration__field"
          placeholder="And surname"
          type="text"
          v-model="registrationData.surname"
        >
        <input
          class="registration__field"
          placeholder="Your group"
          type="text"
          v-model="registrationData.group"
          v-if="getUserIsStudent"
        >
        <input
          class="registration__field"
          placeholder="Email"
          type="text"
          v-model="registrationData.email"
        >
        <input
          class="registration__field"
          placeholder="Also your Telegram tag"
          type="text"
          v-model="registrationData.telegram"
        >
        <label
          class="registration__date-wrapper"
        >
          <span
            class="registration__date-text"
          >Your Birthday</span>
          <input
            class="registration__date"
            type="date"
            pattern="\d{2}-\d{2}-\d{4}"
            v-model="registrationData.birthday"
          >
        </label>
        <div
          class="registration__submit"
          :class="{'registration__submit_inactive': !formDataFull}"
          @click="register"
        >
          Complete Registration
        </div>
      </form>
    </div>
  </RegistrationBlock>
</template>

<script>
import { RegistrationBlock } from "@/styles/styledBlocks.js"
import { mapGetters } from 'vuex'
import { sendPOST } from "@/requests/requests"
import endpoints from "@/requests/endpoints"

export default {
  name: 'Registration',
  components: {
    RegistrationBlock
  },
  // { for teacher
  //   "firstname": "Amika",
  //   "lastname": "Ladshey",
  //   "email": "aladshey@gmail.com",
  //   "age": 28,
  //   "telegram_contact": "@aladshey"
  // }
  // { for student
  //   "firstname":"Jane",
  //   "lastname":"Smith",
  //   "email":"janesmith24@gmail.com",
  //   "group":"Group C",
  //   "age":24,
  //   "telegram_contact":"@janeeeSmith"
  // }
  data() {
    return ({
      registrationData: {
        name: '',
        surname: '',
        group: '',
        email: '',
        telegram: '',
        birthday: '',
      },
    })
  },
  inject: ['ifRouteNameIs', 'goTo'],
  methods: {
    async register() {
      await sendPOST(
        this.getUserIsStudent ?
        endpoints.completeRegistrationStudent :
        endpoints.completeRegistrationTeacher,
        {"Authorization": `Bearer ${this.getAccessToken}`},
        this.getUserIsStudent ? {
          "firstname": this.registrationData.name,
          "lastname": this.registrationData.surname,
          "group": this.registrationData.group,
          "email": this.registrationData.email,
          "telegram_contact": this.registrationData.telegram,
          "birthday": this.registrationData.birthday
        } : {
          "firstname": this.registrationData.name,
          "lastname": this.registrationData.surname,
          "email": this.registrationData.email,
          "telegram_contact": this.registrationData.telegram,
          "birthday": this.registrationData.birthday
        }
      )
      .then(res => {
        if (res.id) {
          console.log('registration worked')
          this.goTo({ name: 'courses' })
        }
      })
    },
  },
  computed: {
    ...mapGetters(['getUserIsStudent', 'getAccessToken']),
    formDataFull() {
      return this.registrationData.name &&
             this.registrationData.surname &&
            (this.getUserIsStudent ? this.registrationData.group : true) &&
            (this.registrationData.email || this.registrationData.telegram) &&
             this.registrationData.birthday
    }
  }
}
</script>
