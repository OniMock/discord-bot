import get from 'axios';

class LinkHandler {
  async handleLinkAction(link) {
    try {
      const response = await get(`https://api.exemplo.com/detect?link=${encodeURIComponent(link)}`);
      console.log(`Requisição para a API com o link ${link} realizada com sucesso!`);
      console.log('Resposta da API:', response.data);
      return `Ação realizada para o link: ${link}, resposta da API: ${response.data.message}`;
    } catch (error) {
      console.error(`Erro ao fazer a requisição para o link ${link}:`, error);
      return `Erro ao realizar a ação para o link: ${link}`;
    }
  }
}

const _LinkHandler = LinkHandler;
export { _LinkHandler as LinkHandler };
