$(function(){
  function buildHTML(message){
      // 「もしメッセージに画像が含まれていたら」という条件式
      if (message.image) {
        var html = `<div class="chat-main__message-list__group">
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
                        </p>
                        <img class="chat-main__message-list__group__message" src="${message.image}" alt="">
                      </div>
                    </div>`;                                
      } else {
        var html = `<div class="chat-main__message-list__group">
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
                        </p>
                      </div>
                    </div>`;
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
  })
