// Making an API request
var pageIdGlobal = process.env.PAGEID;
var accessTokenGlobal = process.env.ACCESSTOKEN;


//#####################################################################################################


const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode')


menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
});

//----------------------------------------------------------------



//---------------------------------------
//---------------------------------------
// Get NO. of Friends of Facebook Account Via API
var userId = pageIdGlobal;
var accessToken = accessTokenGlobal;

fetch(`https://graph.facebook.com/v18.0/${userId}?fields=id%2Cname%2Cfriends&access_token=${accessToken}`)
    .then(response => response.json())
    .then(data => {
        // Display number of friends on page

        document.getElementById('friendsCount').textContent = `: ${data.friends.summary.total_count}`;
    })
    .catch(error => {
        console.error(error);

        document.getElementById('friendsCount').textContent = 'Error: Token Expired';
    });
//---------------------------------------

//---------------------------------------
//---------------------------------------
//Last Post date on FaceBook
var userId1 = pageIdGlobal; // Replace with the Facebook user ID you want to fetch posts from
var accessToken1 = accessTokenGlobal;

fetch(`https://graph.facebook.com/v18.0/${userId1}/posts?fields=created_time&access_token=${accessToken1}`)
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.length > 0) {
            // Extract the created_time of the latest post
            var latestPostDateTime = new Date(data.data[0].created_time);

            // Format the date and time
            var formattedDateTime = latestPostDateTime.toLocaleString();

            // Display the latest post date and time
            document.getElementById('latestPostDateTime').textContent = ` ${formattedDateTime}`;
        } else {
            document.getElementById('latestPostDateTime').textContent = 'Token Expired';
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById('latestPostDateTime').textContent = ' Error';
    });
//---------------------------------------

//----------------------------------------------------------------
// // Display table from Orders array
// Orders.forEach(order => {
//     const tr = document.createElement('tr');
//     const trContent = `
//    <td>${order.productName} </td>
//    <td>${order.productNumber}</td>
//    <td>${order.paymentStatus}</td>

//    <td class="${order.status === 'Declined' ?
//             'danger' : order.status === 'Pending' ? 'warning'
//                 : 'primary'}">${order.status}</td>

//     <td class = "primary">Details </td>
//                      `;


//     tr.innerHTML = trContent;
//     document.querySelector('table tbody').appendChild(tr);

// });
//--------------------------------------------------
//--------------------------------------------------

//---------------------------------------
//---------------------------------------

// Recent Post put in Table for HTML ---------
//---------------------------------------

var postsArray = [];
var currentLimit = 3; // Initial limit
var showMore = false; // Initial state

// Function to fetch and display posts
function fetchAndDisplayPosts(limit) {
    fetch(`https://graph.facebook.com/v18.0/${pageIdGlobal}/posts?access_token=${accessTokenGlobal}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            // Clear the existing table rows
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = '';

            // Extract posts and push them into postsArray
            postsArray = data.data;

            // Create table rows for each post in postsArray
            postsArray.forEach(postmsg => {
                const tr = document.createElement('tr');

                // Convert to IST (Indian Standard Time)
                const gmtTime = new Date(postmsg.created_time);
                const istTime = new Date(gmtTime.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
                const istTimeString = istTime.toLocaleString(); // You can format the string as needed

                const trContent = `
                    <td></td>
                    <td>${postmsg.message}</td>
                    <td>${istTimeString}</td>
                    <td class="primary">Active</td>
                    <td class="primary">Details</td>
                `;

                tr.innerHTML = trContent;
                tableBody.appendChild(tr);
            });

            // Update the current limit
            currentLimit = limit;

            // Toggle the button text and state
            const toggleButton = document.getElementById('togglePosts');
            if (showMore) {
                toggleButton.textContent = 'Show Less ';
            } else {
                toggleButton.textContent = 'Show More ';
            }
        })
        .catch(error => { 
            console.error(error);
            // Handle errors gracefully
        });
}

// Initial load of 3 posts
fetchAndDisplayPosts(currentLimit);

// Add an event listener to the toggle button
const toggleButton = document.getElementById('togglePosts');
toggleButton.addEventListener('click', () => {
    // Toggle between showing more and fewer posts
    showMore = !showMore;
    if (showMore) {
        fetchAndDisplayPosts(7);
    } else {
        fetchAndDisplayPosts(3);
    }
});

