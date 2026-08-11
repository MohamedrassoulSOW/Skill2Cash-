/** Remplace par ton vrai numéro WhatsApp (indicatif pays, sans +) */
export const WHATSAPP_NUMBER = '212600000000'

export const WHATSAPP_PREFILL =
  'Salut Skill2Cash ! Je veux monétiser mes compétences. Tu peux m’aider ?'

export const PREMIUM_PRICE = '149 MAD'
export const PREMIUM_PRICE_NOTE = 'accès lifetime · early bird'

export function whatsappUrl(message = WHATSAPP_PREFILL) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
