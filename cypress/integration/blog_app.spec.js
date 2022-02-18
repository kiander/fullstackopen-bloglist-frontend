describe('Blog app', function ()
{
  const user = {
    name: 'Janne Kalastaja',
    username: 'kalajanne',
    password: 'kalasana'
  }

  beforeEach(function ()
  {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
      cy.contains('login').click()
    })

  it('user can log in with correct credentials', function ()
  {
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login-button').click()
    cy.get('#login-done-div')
    .should('contain', user.name + ' logged in')
  })

  it('user cant log in with incorrect password', function ()
  {
    cy.contains('login').click()
    cy.get('#username').type(user.username)
    cy.get('#password').type('salasana')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      
      cy.get('#add-blog-button').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Blog Author')
      cy.get('#url').type('www.newblog.com')
      cy.get('#save-blog-button').click()

      cy.get('#blog-list').contains('new blog')
    })
  })
})