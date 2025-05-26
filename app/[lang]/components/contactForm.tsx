import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xrbpvzbq')
  if (state.succeeded) {
    return <></>
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        <></>
      </label>
      <input id="name" type="name" name="name" />
      <ValidationError prefix="Name" field="name" errors={state.errors} />
      <label htmlFor="email">
        <></>
      </label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        <></>
      </button>
    </form>
  )
}
