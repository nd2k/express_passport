<template>
  <v-app id="myApp">
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Formulaire d'enregistrement</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="email" label="Votre adresse email" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Votre mot de passe" type="password"></v-text-field>
                  <v-text-field id="confirmPassword" prepend-icon="lock" name="password" label="Confirmer votre mot de passe" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  
}
</script>

