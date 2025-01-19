let honeypotKey;


// Ambil honeypot key dari server
async function getHoneypotKey() {
    const response = await fetch("https://nemesisscripts.onrender.com/get-honeypot-key");
    const data = await response.json();
    honeypotKey = data.honeypot_key;
    document.getElementById("honey").value = honeypotKey;
}

function Notify(msg, type) {
    Swal.fire({
        title: (type == 'success') ? 'Success' : 'Error',
        text: msg,
        icon: (type == 'success') ? 'success' : 'error',
      });
}

function ClearForm() {
    $("#license_key").val("");
    $("#discord_id").val("");
    $("#new_auth").val("");
    $("#server_1").val("");
    $("#server_2").val("");
}

function ReloadPage() {
    location.reload();
}

function checkLicense() {
    var license_key = document.getElementById("license_key").value;
    var discord_id = document.getElementById("discord_id").value;
    var product_name = document.getElementById("product_name").value;
    $.ajax({
        type: "POST",
        url: "https://nemesisscripts.onrender.com/verifylicense",
        contentType: "application/json", // Tambahkan ini
        dataType: "json", // Tambahkan ini
        data: JSON.stringify({ // Ubah data ke format JSON
            license_key: license_key,
            product_name: product_name,
            discord_id: discord_id,
            honeypot_key: honeypotKey
        }),
        success: function(data) {
            if (data["status"] == "ok") {
                Notify(data["message"], "success");
                if (data["slot"] == "1") {
                    // disable input #server_2
                    $("#server_2").prop("disabled", true);
                    $("#server_1").val(data["server_1"]);
                }else {
                    $("#server_2").prop("disabled", false);
                    $("#server_1").val(data["server_1"]);
                    $("#server_2").val(data["server_2"]);
                }
                // set html id server_1 dan server_2
            } else {
                Notify(data["message"], "error");
            }
            getHoneypotKey();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function updateAuth(){
    var license_key = document.getElementById("license_key").value;
    var discord_id = document.getElementById("discord_id").value;
    var product_name = document.getElementById("product_name").value;
    var new_auth = document.getElementById("new_auth").value;
    $.ajax({
        type: "POST",
        url: "https://nemesisscripts.onrender.com/updateauth",
        contentType: "application/json", // Tambahkan ini
        dataType: "json", // Tambahkan ini
        data: JSON.stringify({ // Ubah data ke format JSON
            license_key: license_key,
            discord_id: discord_id,
            product_name: product_name,
            new_auth: new_auth,
            honeypot_key: honeypotKey
        }),
        success: function(data) {
            if (data["status"] == "ok") {
                Notify(data["message"], "success");
            } else {
                Notify(data["message"], "error");
            }
            ClearForm();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

function updateData(){
    var license_key = document.getElementById("license_key").value;
    var discord_id = document.getElementById("discord_id").value;
    var product_name = document.getElementById("product_name").value;
    var server_1 = document.getElementById("server_1").value;
    var server_2 = document.getElementById("server_2").value;
    $.ajax({
        type: "POST",
        url: "https://nemesisscripts.onrender.com/updatelicense",
        contentType: "application/json", // Tambahkan ini
        dataType: "json", // Tambahkan ini
        data: JSON.stringify({ // Ubah data ke format JSON
            license_key: license_key,
            discord_id: discord_id,
            product_name: product_name,
            server_1: server_1,
            server_2: server_2,
            honeypot_key: honeypotKey
        }),
        success: function(data) {
            if (data["status"] == "ok") {
                Notify(data["message"], "success");
            } else {
                Notify(data["message"], "error");
            }
            ClearForm();
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    getHoneypotKey();
});
