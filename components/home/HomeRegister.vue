<template>
  <section>
    <b-container>
      <b-row>
        <b-col
          md="8"
          lg="6"
          offset-md="2"
          offset-lg="3"
        >
          <b-card
            title="Sign Up Today"
            title-tag="h2"
            bg-variant="primary"
            text-variant="light"
            class="my-3 text-center"
          >
            <div class="card-text my-5 text-left">
              <p>Here's where the call to action to get users to sign up will go.</p>
            </div>

            <div class="card-text">
              <b-btn
                variant="light"
                to="register"
                size="lg"
              >
                Register
              </b-btn>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style scoped>
section {
  padding: 4rem 0;
}

p {
  font-size: 1.4em;
  max-width: 80%;
  margin: auto;
}
</style>
