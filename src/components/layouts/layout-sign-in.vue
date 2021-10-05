<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs8 sm7 md5 lg2>
            <v-card elevation="0">
              <v-card-text>
                <v-text-field
                  v-model="email.value"
                  label="E-mail"
                  prepend-icon="email"
                ></v-text-field>
                <v-text-field  
                  v-model="password.value"
                  label="Password"
                  prepend-icon="lock"
                  type="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-card-text>
                  <span class="red--text"> {{ message.value }} &nbsp;</span>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  v-on:click="onButtonClick_SignIn"
                > SIGN IN </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  created: function () {
    this.$storage.removeAccessInfo()
  },
  data: () => ({
    email: {
      value: null
    },
    password: {
      value: null
    },
    message: {
      value: null
    }
  }),
  methods: {
    onButtonClick_SignIn: function () {
      this.$api.signIn({
        email: this.email.value,
        password: this.password.value
      }).then(response => {
        if (response.succeeded) {
          this.$router.push('home')
        }
      }).catch(error => {
        this.message.value = error.reason
      })
    }
  }
}
</script>