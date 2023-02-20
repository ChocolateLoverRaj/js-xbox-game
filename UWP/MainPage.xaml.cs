using Microsoft.Web.WebView2.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.ApplicationModel.Resources.Core;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.UI.Popups;
using System.Diagnostics;
using Windows.UI.ViewManagement;
using Windows.UI.Core;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace Test_UWP_For_Xbox
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            LoadWebview();
        }

        private async void LoadWebview()
        {
            // By default, Xbox gives you a border around your content to help you keep it inside a "TV-safe"
            // area. This helps protect you from drawing too close to the edges of the screen where content may
            // not be visible due to physical variations in televisions.
            //
            // This line disables that behavior. If you want, you can restore the automatic TV-safe area by
            // commenting this line out. Otherwise, be careful not to draw vital content too close to the edge
            // of the screen. Details can be found here:
            // https://docs.microsoft.com/en-us/windows/apps/design/devices/designing-for-tv#tv-safe-area
            ApplicationView.GetForCurrentView().SetDesiredBoundsMode(ApplicationViewBoundsMode.UseCoreWindow);

            // By default, XAML apps are scaled up 2x on Xbox. This line disables that behavior, allowing the
            // app to use the actual resolution of the device (1920 x 1080 pixels).
            if (!ApplicationViewScaling.TrySetDisableLayoutScaling(true))
            {
                Debug.WriteLine("Error: Failed to disable layout scaling.");
            }

            SystemNavigationManager.GetForCurrentView().BackRequested += MainPage_BackRequested;

            // this.RequiresPointer = RequiresPointer.Never;

            const string messageToSend = "Message from UWP app";
            await webView2.EnsureCoreWebView2Async();
            if (webView2.CoreWebView2 != null && true) 
            {
                webView2.CoreWebView2.SetVirtualHostNameToFolderMapping("virtual", "Assets/WebView2", CoreWebView2HostResourceAccessKind.Allow);
                webView2.CoreWebView2.NavigationCompleted += (s, e) => {
                    webView2.CoreWebView2.PostWebMessageAsString(messageToSend);
                };
                webView2.CoreWebView2.WebMessageReceived += (s, e) =>
                {
                    OnWebViewMessage(e.TryGetWebMessageAsString());
                    Debug.WriteLine("Done showing dialog async");
                };
                webView2.CoreWebView2.Navigate("https://virtual/index.html");
            } else
            {
                Debug.WriteLine("WebView2 not available");
                WebView webView = new WebView();
                webView.NavigationCompleted += (sender, args) =>
                {
                    if (webView.Parent == null)
                    {
                        if (args.IsSuccess)
                        {
                            // Replace the current contents of this page with the WebView
                            this.Content = webView;
                            webView.Focus(FocusState.Programmatic);
                        }
                        else
                        {
                            // WebView navigation failed.
                            // TODO: Show an error state
                            Debug.WriteLine($"Initial WebView navigation failed with error status: {args.WebErrorStatus}");
                        }
                    }
                };
                webView.ScriptNotify += (s, e) =>
                {
                    OnWebViewMessage(e.Value);
                };
                //webView.WebResourceRequested += (s, e) =>
                //{

                webView.Navigate(new Uri("https://cute-results-post-98-33-112-127.loca.lt"));
                
                // webView.Navigate(new Uri("https://gamepad-api.netlify.app/"));
            }
        }

        private void MainPage_BackRequested(object sender, BackRequestedEventArgs e)
        {
            if (Frame.CanGoBack)
            {
                Frame.GoBack();
            }
            e.Handled = true;
        }

        private async void OnWebViewMessage (string message)
        {
            await new MessageDialog(message).ShowAsync();
        }
    }
}
