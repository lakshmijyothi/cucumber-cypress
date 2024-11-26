 function performAmphoraActions() {
      // Suppress uncaught exceptions
      cy.on('uncaught:exception', (err) => {
        if (err.message.includes('Script error')) {
          return false; // Ignore script errors
        }
        throw err; // Re-throw if not the expected error
      });
    

}

module.exports = {performAmphoraActions}