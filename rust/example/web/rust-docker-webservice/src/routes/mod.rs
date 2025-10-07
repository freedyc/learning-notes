pub mod docker_routes {
    use actix_web::{web, HttpResponse, Responder};
    use std::process::Command;

    pub async fn start_container() -> impl Responder {
        HttpResponse::Ok().body("Starting Docker container...")
    }

    pub async fn stop_container() -> impl Responder {
        HttpResponse::Ok().body("Stopping Docker container...")
    }

    pub async fn list_containers() -> impl Responder {
        // 执行 docker ps 命令
        let output = Command::new("docker")
            .arg("ps")
            .output();

        match output {
            Ok(output) if output.status.success() => {
                let result = String::from_utf8_lossy(&output.stdout).to_string(); // 这里加 .to_string()
                HttpResponse::Ok().body(result)
            }
            Ok(output) => {
                let err = String::from_utf8_lossy(&output.stderr).to_string(); // 这里加 .to_string()
                HttpResponse::InternalServerError().body(format!("docker ps error: {}", err))
            }
            Err(e) => HttpResponse::InternalServerError().body(format!("Failed to execute docker: {}", e)),
        }
    }

    pub fn configure_routes(cfg: &mut web::ServiceConfig) {
        cfg.service(
            web::scope("/docker")
                .route("/start", web::post().to(start_container))
                .route("/stop", web::post().to(stop_container))
                .route("/list", web::get().to(list_containers)),
        );
    }
}

pub use docker_routes::configure_routes;