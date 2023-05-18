
// Let's import menu, icons and paths

export const admin = [
    
    { title: "Users", src: "User" , path:'/user-management'}, 
    { title: "House owners", src: "Search", path:'/house-owners' },
    { title: "Realtor", src: "Search", path:'/realtor' },
    { title: "Tenant", src: "Chart_fill" , path:'/tenants' },
    { title: "Analytics", src: "Chart" , path:'/analytics' },
    { title: "Profile", src: "Setting", path:'/profile'},
    { title: "My Profile", src: "Setting", path:'/myprofile'},

]

export const realtor = [

    { title: "Users", src: "User" , path:'/user-management'},
    { title: "House owners", src: "User", path:'/house-owners'},
    { title: "House Listing", src: "Chart_fill",path:'/house'},
    { title: "Tenant", src: "User",path:'/tenants'},
    { title: "Payment List", src: "Folder", path:'/payment'},
    { title: "Analytics", src: "Chart", path:'/analytics' },
    { title: "Profile Settings", src: "Setting", path:'/profile'},
    { title: "My Profile", src: "Setting", path:'/myprofile'},

]

export const tenant = [

    { title: "My agent ", src: "Calendar", path:'/my-agent' },
    { title: "Payment", src: "Folder", path:'/payment'},
    { title: "Profile Settings", src: "Setting", path:'/profile'},
    { title: "My Profile", src: "Setting", path:'/myprofile'},

]

export const landlord = [
    
    { title: "My agent ", src: "Folder",  path:'/my-agent' },
    { title: "Analytics", src: "Chart", path:'/analytics'  },
    { title: "Profile Settings", src: "Setting", path:'/profile'},
    { title: "My Profile", src: "Setting", path:'/myprofile'},

]