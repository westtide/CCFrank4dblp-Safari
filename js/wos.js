/**
 * MIT License
 *
 * Copyright (c) 2019-2021 WenyanLiu (https://github.com/WenyanLiu/CCFrank4dblp)
 */

const wos = {};

wos.rankSpanList = [];

wos.run = function () {
    setInterval(function () {
        $(window).bind("popstate", function () {
            wos.appendRanks();
        });
        wos.appendRanks();
    }, 700);
};

wos.appendRanks = function () {
    let publication_elements = $(".summary-source-title-link[lang='en']");
    publication_elements.each(function () {
        let node = $(this);
        if (!node.next().hasClass("ccf-rank")) {
            for (let getRankSpan of wos.rankSpanList) {
                let publication = node.text();
                node.after(getRankSpan(publication, "publication"));
            }
        }
    });
    let meeting_elements = $("[name='conf_title'");
    meeting_elements.each(function () {
        let node = $(this);
        if (!node.next().hasClass("ccf-rank")) {
            for (let getRankSpan of wos.rankSpanList) {
                let meeting = "";
                let options = node.text().match(/\((.+?)\)/g);
                let items = [];
                if (options) {
                    for (let m of options) {
                        let short_name = m.substring(1, m.length - 1).split(/\s+/);
                        let tmp_name = [];
                        for (let name of short_name) {
                            if (name.match(/^[0-9]*$/)) {
                                continue;
                            } else {
                                tmp_name.push(name);
                            }
                        }
                        meeting = tmp_name.join(" ");
                        console.log(meeting);
                        items.push(getRankSpan(meeting, "meeting"));
                    } 
                }

                if (meeting == "") {
                    console.log("not found", meeting);
                    items.push(getRankSpan(meeting, "meeting"));
                }
                node.after(items);
            }
        }
    });
};