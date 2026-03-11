document.getElementById('shorten-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const long_Url = document.getElementById('long-url');
    const longUrl = long_Url.value;
    // CSR: Fetching data without page reload
    try {
        const response = await fetch('/urlgive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: longUrl })
        });
        const data = await response.json();


    if (data.msg) {
         document.getElementById("result").innerText =  data.msg ;
         return;
    }
   else    document.getElementById("result").innerText= `http://localhost:8001/urlgive/${data.id} `;
  
        // Update the UI dynamically
    //  `   // document.getElementById('short-url').innerText = data.shortUrl;
    //     // document.getElementById('result-area').classList.remove('hidden');`
    } 
    catch (err) {
        console.log("Error shortening URL", err);
    }
        //   const data =  fetch("/")
        // .then((stats)=>{
        //     const stat = stats.info;
        //     document.getElementById("history-body").innerHTML = `
        //     <tr>
        //     <td>${stat.redirecturl}</td>
        //     <td> http:localhost:8001/urlgive/${stat.shorturl}</td>
        //     <td>${stat.history.length}</td>
        //     </tr>
        //     `;
        //     // if (stats.success) {
        //     //      window.location.href = '/index.html'
        //     // }
        // })
});
window.addEventListener("DOMContentLoaded" , async () => {
    try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if(data.info){
        const stat = data.info;
        const count = document.getElementById("link-count");
        count.innerText = `${stat.length} Link`
        const tableBody = document.getElementById("history-body");
        const allRows = stat.map(stat => `
        <tr>
            <td>${stat.redirecturl}</td>
            <td>http://localhost:8001/urlgive/${stat.shorturl}</td>
            <td>${stat.history ? stat.history.length : 0}</td>
        </tr>
    `).join(''); // This combines all the row strings together

    tableBody.innerHTML = allRows;
            //   stat.map((obj)=>{
            //       document.getElementById("history-body").innerHTML = `
            //       <tr>
            //       <td>${obj.redirecturl}</td>
            //       <td> http:localhost:8001/urlgive/${obj.shorturl}</td>
            //       <td>${obj.history.length}</td>
            //       </tr>
      
            //       `
            //   }).join('');
        }
        else if(data.msg){
            res.json({msg : data.msg});
        }
    } catch (error) {
        console.log(error);
        
    }
})
