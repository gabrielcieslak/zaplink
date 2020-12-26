<template>
  <div class="dashboard">
    <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h4 class="title is-4">Seu gerenciador digital de contatos</h4>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="level-item">
            <button
              id="addNewContact"
              class="button is-success"
              @click="showContactAddModal = true"
            >
              +
            </button>
          </div>

          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Número do contato"
                  v-model="searchInput"
                />
              </p>
              <p class="control">
                <button class="button is-primary" @click="search()">
                  Buscar
                </button>
              </p>
            </div>
          </div>
        </div>
      </nav>

      <div class="contact-list columns is-multiline">
        <div
          class="column is-4"
          v-for="contact in contactList"
          :key="contact.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/whatsapp.svg" alt="Logo WhatsApp" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ contact.name }}</p>
                  <p class="subtitle is-6">{{ contact.number }}</p>
                </div>
              </div>
              <div class="content">
                {{ contact.description }}
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Conversar</a>
              <a href="#" class="card-footer-item">Apagar</a>
            </footer>
          </div>
        </div>
      </div>
      <b-modal
        v-model="showContactAddModal"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <form action="">
          <div class="modal-card" style="width: 450px">
            <header class="modal-card-head">
              <p class="modal-card-title">Novo Contato</p>
              <button
                type="button"
                class="delete"
                @click="showContactAddModal = false"
              />
            </header>
            <section class="modal-card-body">
              <div class="field input-name">
                <input
                  class="input is-primary"
                  v-model="form.name"
                  placeholder="Nome Completo"
                />
                <small class="has-text-danger" v-if="errorName === true"
                  >Nome inválido</small
                >
              </div>
              <div class="field input-number">
                <input
                  class="input is-primary"
                  v-model="form.number"
                  placeholder="WhatsApp"
                />
                <small class="has-text-danger" v-if="errorNumber === true"
                  >Número inválido</small
                >
              </div>
              <div class="field text-description">
                <textarea
                  class="textarea is-primary"
                  v-model="form.description"
                  placeholder="Assunto"
                />
                <small class="has-text-danger" v-if="errorDescription === true"
                  >Assunto deve conter ao menos 10 caracteres</small
                >
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                id="saveButton"
                type="button"
                class="button is-success"
                @click="create"
              >
                Cadastrar
              </button>
            </footer>
          </div>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      contactList: [],
      showContactAddModal: false,
      errorName: false,
      errorNumber: false,
      errorDescription: false,
      searchInput: "",
      form: {
        name: "",
        number: "",
        description: "",
      },
    };
  },
  methods: {
    search() {
      if (this.searchInput != "") {
        this.contactList = this.contactList.filter(
          (contact) => contact.number === this.searchInput
        )
      } else {
        this.list()
      }
    },
    create() {
      this.errorName = false;
      this.errorNumber = false;
      this.errorDescription = false;

      if (this.form.name === "" || this.form.name.length < 3) {
        this.errorName = true;
      }
      if (this.form.number === "" || this.form.number.length < 9) {
        this.errorNumber = true;
      }
      if (this.form.description === "" || this.form.description.length < 4) {
        this.errorDescription = true;
      }
      if (
        this.errorName === false &&
        this.errorNumber === false &&
        this.errorDescription === false
      ) {
        window.axios.post("/contacts", this.form).then(async (res) => {
          await res.data;
          this.showContactAddModal = false;
          // window.location.reload(); alternativa para o this.list
          this.list();
        });
      }
    },
    list() {
      window.axios.get("/contacts").then(async (res) => {
        this.contactList = await res.data;
      });
    },
  },
  mounted() {
    this.list();
  },
};
</script>
