// This file contains functions and structures for interacting with Docker. 
// It may include functions to start, stop, and manage Docker containers.

pub mod docker {
    use std::process::Command;

    pub fn start_container(container_name: &str) -> Result<(), String> {
        let output = Command::new("docker")
            .arg("start")
            .arg(container_name)
            .output()
            .map_err(|e| e.to_string())?;

        if output.status.success() {
            Ok(())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }

    pub fn stop_container(container_name: &str) -> Result<(), String> {
        let output = Command::new("docker")
            .arg("stop")
            .arg(container_name)
            .output()
            .map_err(|e| e.to_string())?;

        if output.status.success() {
            Ok(())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }

    pub fn list_containers() -> Result<String, String> {
        let output = Command::new("docker")
            .arg("ps")
            .arg("--format")
            .arg("{{.Names}}")
            .output()
            .map_err(|e| e.to_string())?;

        if output.status.success() {
            Ok(String::from_utf8_lossy(&output.stdout).to_string())
        } else {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }
}