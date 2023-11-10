
<template>
  
  <h>Formulaire</h>
  <label for="nom" class="form-element">Nom</label>
  <input type="text" name="nom" id="nom" v-model="nom" class="form-element" />
  <label for="prenom" class="form-element">Prénom</label>
  <input
    type="text"
    name="prenom"
    id="prenom"
    v-model="prenom"
    class="form-element"
  />
  <label for="email" class="form-element">Email</label>
  <input
    type="email"
    name="email"
    id="email"
    v-model="email"
    class="form-element"
  />

  <button v-if="edit" @click="updateContact(selectedId)" class="form-element">
    Modifier
  </button>
  <button v-if="edit" @click="edit = false" class="form-element">
    Annuler
  </button>
  <button v-else @click="createContact" class="btn btn-primary">
    Créer un contact
  </button>
</template>
<script>
const BASE_ID = import.meta.env.VITE_APP_BASS_ID;
const TABLE_NAME = "Leads";
const API_TOKEN = import.meta.env.VITE_APP_TOKEN;

export default {
  data() {
    return {
      contacts: [],
      nom: "",
      prenom: "",
      email: "",
    };
  },
  methods: {
    handleResetForm() {
      this.nom = "";
      this.prenom = "";
      this.email = "";
    },

    createContact() {
      fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          fields: {
            Nom: this.nom,
            Prenom: this.prenom,
            Email: this.email,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.getContacts();
          this.handleResetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style></style>
