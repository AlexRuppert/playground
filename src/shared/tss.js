speechSynthesis.getVoices()
window.speechSynthesis.onvoiceschanged = e => {
  speechSynthesis.getVoices()
}

export default class Tss {
  static chinese(text) {
    let msg = new SpeechSynthesisUtterance(text || '')
    msg.voice =
      speechSynthesis.getVoices().filter(v => v.lang === 'zh-CN')[0] ||
      speechSynthesis.getVoices()[0]
    speechSynthesis.cancel()
    speechSynthesis.speak(msg)
  }

  static chineseSlow(text) {
    let msg = new SpeechSynthesisUtterance(text || '')
    msg.voice =
      speechSynthesis.getVoices().filter(v => v.lang === 'zh-CN')[0] ||
      speechSynthesis.getVoices()[0]
    speechSynthesis.cancel()
    msg.rate = 0.5
    speechSynthesis.speak(msg)
  }
}