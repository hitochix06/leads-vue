<template>
  <div class="container">
    <h1 class="text-center">Formulaire</h1>
    <div class="row mb-3">
      <label for="nom" class="col-sm-2 col-form-label">Nom</label>
      <div class="col-sm-10">
        <input
          type="text"
          name="nom"
          id="nom"
          v-model="nom"
          class="form-control"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="prenom" class="col-sm-2 col-form-label">Prénom</label>
      <div class="col-sm-10">
        <input
          type="text"
          name="prenom"
          id="prenom"
          v-model="prenom"
          class="form-control"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <label for="email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          class="form-control"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button
          v-if="edit"
          @click="edit = false"
          class="btn btn-secondary mr-2"
        >
          Annuler
        </button>
        <button v-else @click="createContact" class="btn btn-primary">
          Créer un contact
        </button>
      </div>
    </div>
  </div>
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
