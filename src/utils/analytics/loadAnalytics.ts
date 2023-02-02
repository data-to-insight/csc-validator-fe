export const loadAnalytics = (tagId: string): void => {
  let ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src =
    ("https:" === document.location.protocol ? "https://www" : "http://www") +
    `.googletagmanager.com/gtag/js?id=${tagId}`;
  ga.onload = (evt: Event) => {
    let integration = document.createElement("script");
    integration.type = "text/javascript";
    integration.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag() {dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "${tagId}")`;
    const s = document.getElementsByTagName("script")[0];
    s?.parentNode?.insertBefore(integration, s);
  };
  const s = document.getElementsByTagName("script")[0];
  s?.parentNode?.insertBefore(ga, s);
};
