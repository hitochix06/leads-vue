<template>
  <div class="container">
    <div>
      <h1 class="text-center">Liste</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td>{{ contact.fields.Nom }}</td>
            <td>{{ contact.fields.Prenom }}</td>
            <td>{{ contact.fields.Email }}</td>
            <td>
              <button
                class="btn btn-primary button-margin"
                @click="handleUpdate(contact)"
              >
                Modifier
              </button>
              <button class="btn btn-danger" @click="deleteContact(contact.id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
const BASE_ID = import.meta.env.VITE_APP_BASS_ID;
const TABLE_NAME = "Leads";
const VIEW_NAME = "Grid view";
const API_TOKEN = import.meta.env.VITE_APP_TOKEN;

export default {
  data() {
    return {
      contacts: [],
      nom: "",
      prenom: "",
      email: "",
      selectedId: null,
      edit: false,
    };
  },
  methods: {
    handleResetForm() {
      this.nom = "";
      this.prenom = "";
      this.email = "";
    },
    getContacts() {
      fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?view=${VIEW_NAME}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.contacts = data.records;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteContact(id) {
      fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.getContacts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateContact(id) {
      fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
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
          this.handleResetForm();
          this.edit = false;
          this.getContacts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleUpdate(contact) {
      this.nom = contact.fields.Nom;
      this.prenom = contact.fields.Prenom;
      this.email = contact.fields.Email;
      this.selectedId = contact.id;
      this.edit = true;
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

  mounted() {
    this.getContacts();
  },
};
</script>
<style>
.button-margin {
  margin-right: 10px;
}
</style>
