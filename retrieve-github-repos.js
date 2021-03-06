let url = 'https://api.github.com/users/wadethestealth/repos';
let accepts = 'application/vnd.github.v3+json';
let response;
let repos;
let currentRepoDisplay = 0;
let request = new XMLHttpRequest();
request.open("GET", url);
request.setRequestHeader("Accept", accepts);
request.onload = function() {
	response = request.response;
	repos = JSON.parse(response);
	removeDefaultElements();
	addNReposToBody(repos, 3);
};
request.send();

function addNReposToBody(reposJSON, n) {
	if (!reposJSON) return;
	
	for (
		let i = currentRepoDisplay;
		i < reposJSON.length && i - currentRepoDisplay < n;
		i++
	) {
		addRepoToBody(reposJSON[i]);
		if (i + 1 >= reposJSON.length) {
			document.getElementById("github_embed").parentNode.removeChild(
				document.getElementById("more_github")
			);
		}
	}
	currentRepoDisplay =
		currentRepoDisplay + n < reposJSON.length
			? currentRepoDisplay + n
			: reposJSON.length;
}

function removeDefaultElements() {
	let loadingElement = document.getElementById("loading_github_embed");
	loadingElement.parentNode.removeChild(loadingElement);
	let noscriptElement = document.getElementById("noscript_github_embed");
	noscriptElement.parentNode.removeChild(noscriptElement);
}

function addRepoToBody(repoJSON) {
	let repoSectionElement = document.createElement("section");
	repoSectionElement.classList.add("github_repo_container");
	let repoLinkToElement = document.createElement("a");
	repoLinkToElement.setAttribute("href", repoJSON.html_url);
	let repoTitleElement = document.createElement("h3");
	repoTitleElement.innerHTML = repoJSON.name;
	let repoFullNameElement = document.createElement("p");
	repoFullNameElement.classList.add("github_repo_fullname");
	repoFullNameElement.innerHTML = repoJSON.full_name;
	let repoDescriptionElement = document.createElement("h4");
	repoDescriptionElement.innerHTML = repoJSON.description;
	let repoWebsiteElement = document.createElement("a");
	repoWebsiteElement.setAttribute("href", repoJSON.homepage);
	repoWebsiteElement.innerHTML = repoJSON.homepage;

	repoLinkToElement.appendChild(repoTitleElement);
	repoLinkToElement.appendChild(document.createElement("br"));
	repoLinkToElement.appendChild(repoFullNameElement);

	repoSectionElement.appendChild(repoLinkToElement);
	repoSectionElement.appendChild(document.createElement("br"));
	repoSectionElement.appendChild(document.createElement("br"));
	repoSectionElement.appendChild(repoDescriptionElement);
	repoSectionElement.appendChild(document.createElement("br"));
	repoSectionElement.appendChild(repoWebsiteElement);

	document.getElementById("github_embed").appendChild(repoSectionElement);
}
