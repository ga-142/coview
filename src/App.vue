<template>
  <div id="app" class="h-100">
    <div id="nav">
      <h1 class="extra-bold text-left"><i class="fas fa-virus"></i> Coview</h1>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dedede;
}
.grey-border {
  border: solid 1px #555;
}
h1,
h2,
h3,
h4,
h5 {
  color: #dedede;
}
#nav h1.extra-bold {
  display: inline-block;
  font-weight: 800;
  margin-right: 3em;
  margin-bottom: 0;
}
#nav h1.extra-bold i {
  color: #ce463f;
}
#nav {
  text-align: left;
  padding: 13px 30px;
  background-color: #202020;
}

#nav a {
  padding: 0 1em;
  font-size: 1.3em;
  font-weight: bold;
  color: #dedede;
}

#nav a.router-link-exact-active {
  color: #f4b25c;
}
html,
body {
  background-color: #2a2a2a;
  height: 100%;
}
.h-100 {
  height: 100%;
}
</style>
