passwordHandler.forEach(handler => {
  console.log("debug 1");
  handler.addEventListener("click", () => {
    console.log("debug 1");

    passwordFields.forEach(field => {
      console.log("debug 3");
      if (field.type !== "password") return (field.type = "password");
      console.log("debug 4");
      field.type = "text";

      passwordHandler.forEach(icon => {
        console.log("debug 5");
        passwordHandler.classList.replace("fa-eye-slash", "fa-eye");
      });
    });
  });
});
