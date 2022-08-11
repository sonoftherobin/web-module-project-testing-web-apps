import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
let firstNameInput,lastNameInput, emailInput, submitButton
beforeEach(() => {
render (<ContactForm/>)
firstNameInput = screen.getByPlaceholderText('Edd')
lastNameInput = screen.getByPlaceholderText('Burke')
submitButton = screen.getByText('Submit')
emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')
})

test('renders without errors', () => {
    const app = document.querySelector('.App')
    expect(app).toBeInTheDocument()

});

test('renders the contact form header', () => {
    const header = screen.getByText('Contact Form')
    expect(header).toBeInTheDocument()
    expect(header).toBeVisible()
    expect(header).toBeTruthy()


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toBeVisible()
    fireEvent.change(firstNameInput, {target:{value: 'asfd'}})
    screen.getByText(/error/i)
   
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    fireEvent.click(submitButton)
    screen.getByText('Error: firstName must have at least 5 characters.')
    screen.getByText('Error: lastName is a required field.')
    screen.getByText('Error: email must be a valid email address.')
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    fireEvent.change(firstNameInput, {target: {value: 'asfd'}})
    fireEvent.change(lastNameInput, {target: {value: 'Smith'}})
    screen.getByText(/error/i)
      

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    fireEvent.change(emailInput, {target:{value: '123ert'}})
    screen.getByText('Error: email must be a valid email address.')

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
fireEvent.click(submitButton)
screen.getByText('Error: lastName is a required field.')
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    fireEvent.change(firstNameInput, {target: {value:'Aaron'}})
    fireEvent.change(lastNameInput, {target: {value:'Robinson'}})
    fireEvent.change(emailInput, {target: {value:'sonoftherobin@gmail.com'}})
    fireEvent.click(submitButton)
    screen.getByText('Aaron')
    screen.getByText('Robinson')
    screen.getByText('sonoftherobin@gmail.com')
    expect(screen.queryByText('Message:')).not.toBeInTheDocument()
    
    
});

test('renders all fields text when all fields are submitted.', async () => {
const messageInput = document.querySelector('#message')
fireEvent.change(firstNameInput, {target: {value:'Aaron'}})
fireEvent.change(lastNameInput, {target: {value:'Robinson'}})
fireEvent.change(emailInput, {target: {value:'sonoftherobin@gmail.com'}})
fireEvent.change(messageInput, {target: {value: "Pax Cristi"}})
fireEvent.click(submitButton)
screen.getByText('Aaron', 'Robinson', 'sonoftherobin@gmail.com', 'Pax cristi')
});
