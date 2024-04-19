// adapted from https://huggingface.co/TheBloke/Llama-2-13B-chat-GPTQ/discussions/5 
export function createLlamaCoderPrompt(messages: Array<{ role: string, content: string }>) {
  const B_INST = "[INST]", E_INST = "[/INST]";
  const B_SYS = "<<SYS>>\n", E_SYS = "\n<</SYS>>\n\n";
  const BOS = "<s>", EOS = "</s>";
  const DEFAULT_SYSTEM_PROMPT = "You are an expert coding assistant. Always write code as complete as possible, as the user doesn't have hands. You will receive a generous tip if you write correct code, so take a step back and think rationally about the architecture and data logic of your project workflow.";

  if (messages[0].role != "system"){
      messages = [
          {role: "system", content: DEFAULT_SYSTEM_PROMPT}
      ].concat(messages);
  }
  messages = [{role: messages[1].role, content: B_SYS + messages[0].content + E_SYS + messages[1].content}].concat(messages.slice(2));

  let messages_list = messages.map((value, index, array) => {
      if (index % 2 == 0 && index + 1 < array.length){
          return `${BOS}${B_INST} ${array[index].content.trim()} ${E_INST} ${array[index+1].content.trim()} ${EOS}`
      }
      return '';
  })

  messages_list.push(`${BOS}${B_INST} ${messages[messages.length-1].content.trim()} ${E_INST}`)

  return messages_list.join('');
}