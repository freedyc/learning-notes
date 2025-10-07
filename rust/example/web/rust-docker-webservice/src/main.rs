// This is the entry point of the application. It initializes the web server and sets up the routes for handling requests related to Docker scripts.

use actix_web::{App, HttpServer};
use crate::routes::configure_routes;

mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(configure_routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}