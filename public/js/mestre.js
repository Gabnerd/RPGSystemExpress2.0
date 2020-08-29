//initial setup
$.ajax({
    type: "get",
    url: "http://localhost:3333/api/players/",
    success: function(response) {
        for (let i = 0; i < response.length; i++) {
            var jogador = response[i];
            $("#pills-tab").append("" +
                "<li class=\"nav-item\"role=\"presentation\">" +
                "<a class=\"nav-link\" id=\"" + jogador.id + "\" data-toggle=\"pill\" href=\"#" + jogador.nome + jogador.id + "\" role=\"tab\" aria-controls=\"" + jogador.nome + jogador.id + "\" aria-selected=\"false\"> " + jogador.nome + " </a>" +
                " </li> ");
            $("#tabsMestre").append("<div class=\"tab-pane fade\" id=\"" + jogador.nome + jogador.id + "\" role=\"tabpanel\" aria-labelledby=\"" + jogador.id + "\">" + jogador.nome + jogador.id + "</div>")
        }
    }
});