using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System.Security.Cryptography;
using System.Text;

namespace Middleware.Functions
{
    public static class FileHasher
    {
        [FunctionName("FileHasher")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            var body = await req.Content.ReadAsByteArrayAsync();

            string hash = ComputeHash(body);

            return new HttpResponseMessage()
            {
                Content = new StringContent(hash)
            };
        }

        private static string ComputeHash(byte[] data)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(data);

                return BitConverter.ToString(bytes);
            }
        }
    }
}
