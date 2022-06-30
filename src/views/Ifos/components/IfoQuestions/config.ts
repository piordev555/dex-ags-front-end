import { NATIVE_CURRENCY } from 'config/constants/tokens'

const config = [
  {
    title: 'What’s the difference between a Basic Sale and Unlimited Sale?',
    description: [
      `In the Basic Sale, every user can commit a maximum of about 100 USD worth of $${NATIVE_CURRENCY.wrapSymbol} Tokens. We calculate the maximum $${NATIVE_CURRENCY.wrapSymbol} amount about 30 minutes before each IDO. The Basic Sale has no participation fee.`,
      `In the Unlimited Sale, there’s no limit to the amount of $${NATIVE_CURRENCY.wrapSymbol} Tokens you can commit. However, there’s a fee for participation: see below.`,
    ],
  },
  {
    title: 'Which sale should I commit to? Can I do both?',
    description: [
      'You can choose one or both at the same time! If you’re only committing a small amount, we recommend the Basic Sale first.',
    ],
  },
  {
    title: 'How much is the participation fee?',
    description: [
      'There’s only a participation fee for the Unlimited Sale: there’s no fee for the Basic Sale.',
      'The fee will start at 1%.',
      'The 1% participation fee decreases in cliffs, based on the percentage of overflow from the “Unlimited” portion of the sale.',
    ],
  },
  {
    title: 'Where does the participation fee go?',
    description: [
      `We burn it. The $${
        NATIVE_CURRENCY.wrapSymbol
      } tokens from the participation fee will be decomposed. We will then use the $${
        NATIVE_CURRENCY.wrapSymbol
      } portion to market buy the ${'$AGS'} equivalent, and finally throw all of the $AGS into the weekly token burn.`,
    ],
  },
  {
    title: 'How can I get an achievement for participating in the IDO?',
    description: [
      `You need to contribute a minimum of about 10 USD worth of $${NATIVE_CURRENCY.wrapSymbol} Tokens to either sale.`,
      'You can contribute to one or both, it doesn’t matter: only your overall contribution is counted for the achievement.',
    ],
  },
]
export default config
