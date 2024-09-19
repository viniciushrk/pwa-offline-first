using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cadastro_especial.Controllers
{
    public class DeficienteController : Controller
    {
        // Exibe o formulário de cadastro
        public IActionResult Cadastro()
        {
            return View();
        }

        public IActionResult Lista()
        {
            return View();
        }

        // Processa o envio do formulário
        [HttpPost]
        public IActionResult Cadastrar(string Nome, string CPF, DateTime DataNascimento)
        {
            // Aqui você pode adicionar a lógica para salvar os dados no banco, validar CPF, etc.
            // Exemplo simples de retorno
            ViewBag.Message = "Cadastro realizado com sucesso!";
            return View("Cadastro");
        }
    }
}
