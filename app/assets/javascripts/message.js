$(function(){
  
  function buildHTML(message){
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="chat-main__message-list__group" data-message-id="${message.id}">
                    <div class="chat-main__message-list__group__message">
                      <div class="chat-main__message-list__group__s">
                        <div class="chat-main__message-list__group__s__name">
                        ${message.user_name}
                        </div>
                        <div class="chat-main__message-list__group__s__time">
                        ${message.date}
                        </div>
                      </div>
                      <div class="chat-main__message-list__group__message">
                        ${message.content}
                        <img class="chat-main__message-list__group__message--img" src="${message.image}" alt="">
                      </div>
                    </div>
                  </div>`
      // 「もしメッセージに画像が含まれていたら」という条件式
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="chat-main__message-list__group" data-message-id="${message.id}">
                    <div class="chat-main__message-list__group__message">
                      <div class="chat-main__message-list__group__s">
                        <div class="chat-main__message-list__group__s__name">
                        ${message.user_name}
                        </div>
                        <div class="chat-main__message-list__group__s__time">
                        ${message.date}
                        </div>
                      </div>
                      <div class="chat-main__message-list__group__message">
                        ${message.content}
                      </div>
                    </div>
                  </div>`
    }else {
        var html = `<div class="chat-main__message-list__group" data-message-id="${message.id}">
                      <div class="chat-main__message-list__group__message" >
                        <div class="chat-main__message-list__group__s">
                          <div class="chat-main__message-list__group__s__name">
                          ${message.user_name}
                          </div>
                          <div class="chat-main__message-list__group__s__time">
                          ${message.date}
                          </div>
                        </div>
                        <div class="chat-main__message-list__group__message">
                          <img class="chat-main__message-list__group__message--img" src="${message.image}" alt="">
                        </div>
                      </div>
                    </div>`                                
      } 
      
      return html
  }
  $('#new_message').on('submit', function(e){
    
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.new_message')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form__type__send__btn').prop('disabled', false);
      })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      })
    }) 

    var reloadMessages = function() {
      if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.chat-main__message-list__group:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat-main__message-list').append(insertHTML)
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        }
        
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
      
      }
    }
    setInterval(reloadMessages, 7000);
  })